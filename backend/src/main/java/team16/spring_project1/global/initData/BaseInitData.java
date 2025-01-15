package team16.spring_project1.global.initData;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import team16.spring_project1.domain.order.Order;
import team16.spring_project1.domain.order.OrderItem;
import team16.spring_project1.repository.order.OrderRepository;

@Configuration
@RequiredArgsConstructor
@Profile("!prod") // prod 환경일시 비활성화
@Slf4j
public class BaseInitData {

    private final OrderRepository orderRepository;

    /* @PreDestroy
     public void clearDataOnShutdown() {
         log.info("모든 데이터 삭제");
         orderRepository.deleteAll(); // 모든 데이터 삭제
     }

     @PostConstruct
     public void init() {
         log.info("Order 테스트 데이터 생성 ");

         if (orderRepository.count() > 0) {
             return;
         }

         // Order 5개 생성
         for (int i = 1; i <= 5; i++) {
             Order order = new Order();
             order.setEmail("user" + i + "@example.com");
             order.setStatus(DeliveryStatus.PAYMENT_COMPLETED);

             // OrderItems 무작위 생성 (1 ~ 3개)
             int itemCount = (int) (Math.random() * 3) + 1; // 1 ~ 3
             List<OrderItem> orderItems = new ArrayList<>();

             for (int j = 1; j <= itemCount; j++) {
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

             createOrder(order);
         }
     }
 */
    public void createOrder(Order order) {

        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(order);
        }

        orderRepository.save(order);
    }
}
