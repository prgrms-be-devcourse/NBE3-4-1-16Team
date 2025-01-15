package team16.spring_project1.domain.product.product.Controller;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.product.product.DTO.ProductRequest;
import team16.spring_project1.domain.product.product.Service.ProductService;
import team16.spring_project1.domain.product.product.entity.Product;

import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class ProductControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    private ProductService productService;

    @Test
    @DisplayName("상품 등록")
    void t1() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/products")
                        .content("""
                                {
                                    "category": "테스트 카테고리",
                                    "imageUrl": "https://naver.com",
                                    "productName": "테스트 제품 이름",
                                    "price": 5000
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        Product product = productService.findLatest().get();

        assertThat(product.getProductName()).isEqualTo("테스트 제품 이름");
        assertThat(product.getImageUrl()).isEqualTo("https://naver.com");
        assertThat(product.getCategory()).isEqualTo("테스트 카테고리");
        assertThat(product.getPrice()).isEqualTo(5000);

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("create"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("성공"));
    }

    @Test
    @DisplayName("상품 다건 조회")
    void t2() throws Exception {
        ResultActions resultActions = mvc
                .perform(get("/products"))
                .andDo(print());

        List<Product> products = productService.findAll();

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("items"))
                .andExpect(status().isOk());

        for(int i = 0; i < products.size(); i++) {
            Product product = products.get(i);

            resultActions
                    .andExpect(jsonPath("$.[%d].id".formatted(i)).value(product.getId()))
                    .andExpect(jsonPath("$.[%d].createDate".formatted(i)).value(Matchers.startsWith(product.getCreateDate().toString().substring(0, 23))))
                    .andExpect(jsonPath("$.[%d].modifyDate".formatted(i)).value(Matchers.startsWith(product.getModifyDate().toString().substring(0, 23))))
                    .andExpect(jsonPath("$.[%d].productName".formatted(i)).value(product.getProductName()))
                    .andExpect(jsonPath("$.[%d].price".formatted(i)).value(product.getPrice()))
                    .andExpect(jsonPath("$.[%d].imageUrl".formatted(i)).value(product.getImageUrl()))
                    .andExpect(jsonPath("$.[%d].category".formatted(i)).value(product.getCategory()));
        }
    }

    @Test
    @DisplayName("상품 수정")
    void t3() throws Exception {
        ProductRequest restResponse = new ProductRequest().builder()
                .productName("수정된 커피콩")
                .imageUrl("/")
                .category("수정된커피콩")
                .price(9999)
                .build();
        mvc.perform(put("/products/1")
                        .flashAttr("RestResponse", restResponse))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("성공"));


    }

    @Test
    @DisplayName("상품 단건 조회")
    void t4() throws Exception {
        ResultActions resultActions = mvc
                .perform(get("/products/1"))
                .andDo(print());

        Product product = productService.findById(1).get();

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("item"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(product.getId()))
                .andExpect(jsonPath("$.createDate").value(Matchers.startsWith(product.getCreateDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.modifyDate").value(Matchers.startsWith(product.getModifyDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.productName").value(product.getProductName()))
                .andExpect(jsonPath("$.price").value(product.getPrice()))
                .andExpect(jsonPath("$.imageUrl").value(product.getImageUrl()))
                .andExpect(jsonPath("$.category").value(product.getCategory()));
    }
    @Test
    @DisplayName("상품 삭제")
    void t5() throws Exception {

        mvc.perform(put("/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("성공"));
    }
}
