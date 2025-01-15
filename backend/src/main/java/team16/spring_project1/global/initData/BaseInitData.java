package team16.spring_project1.global.initData;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.product.product.Service.ProductService;
import team16.spring_project1.domain.product.product.entity.Product;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    private final ProductService productService;

    @Autowired
    @Lazy
    private BaseInitData self;

    @Bean
    public ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work1();
        };
    }

    @Transactional
    public void work1() {
        if(productService.count() > 0) return;

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
}
