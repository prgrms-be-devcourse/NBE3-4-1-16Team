package team16.spring_project1.global.initData;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.order.Order;
import team16.spring_project1.domain.order.OrderItem;
import team16.spring_project1.domain.product.product.Service.ProductService;
import team16.spring_project1.domain.product.product.entity.Product;
import team16.spring_project1.global.enums.DeliveryStatus;
import team16.spring_project1.service.order.OrderService;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BaseInitData {
    private final ProductService productService;
    private final OrderService orderService;

    @Autowired
    @Lazy
    private BaseInitData self;

    @Bean
    public ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work1();
            self.work2();
        };
    }

    @Transactional
    public void work1() {
        if (productService.count() > 0) return;
        Product product1 = productService.create(
                "원두커피 베트남 로부스타 G1 1kg 커피창고 고소한 맛있는 홀빈 콩",
                "커피콩",
                14900,
                "https://shop-phinf.pstatic.net/20240531_84/17171115333012Dsah_JPEG/118247422005482143_630751200.jpg"
        );
        Product product2 = productService.create(
                "테라로사 올데이 블렌드 원두커피 1.13kg",
                "커피콩",
                36900,
                "https://shopping-phinf.pstatic.net/main_1750344/17503448138.20190215162842.jpg"
        );
        Product product3 = productService.create(
                "스타벅스 커클랜드 원두커피 하우스 블렌드 1.13kg",
                "커피콩",
                23860,
                "https://shopping-phinf.pstatic.net/main_2461161/24611612527.1.20201027171504.jpg"
        );
        Product product4 = productService.create(
                "산미높은 약배전원두 에티오피아 코케허니 예가체프G1 스페셜티 갓볶은 원두홀빈 200g [원산지:에티오피아]",
                "커피콩",
                11200,
                "https://shop-phinf.pstatic.net/20241019_251/1729335546752dKz5H_JPEG/63468447768544782_588487658.jpg"
        );
    }

    @Transactional
    public void work2() {
        log.debug("BaseInitData work2() 실행");
        for (int i = 1; i <= 3; i++) {
            Order order = createOrder(1);
            orderService.createOrder(order);
        }
    }

    private static Order createOrder(int i) {
        Order order = new Order();
        order.setEmail("user" + i + "@example.com");
        order.setStatus(DeliveryStatus.PAYMENT_COMPLETED);
        List<OrderItem> orderItems = new ArrayList<>();

        for (int j = 1; j <= 2; j++) {
            OrderItem item = new OrderItem();
            item.setProductName("Item " + i + "-" + j);
            item.setPrice(i * 500);
            item.setCount((int) (Math.random() * 5) + 1);   // 1 ~ 5
            item.setOrder(order);
            orderItems.add(item);
        }

        // 총 가격 계산
        int totalPrice = orderItems.stream()
                .mapToInt(OrderItem::calculateTotalPrice)
                .sum();

        order.setTotalPrice(totalPrice);
        order.setOrderItems(orderItems);
        return order;
    }
}
