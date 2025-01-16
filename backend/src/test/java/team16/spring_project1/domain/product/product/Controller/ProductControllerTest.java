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
                                    "price": "5000"
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
        assertThat(product.getPrice()).isEqualTo("5000");

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("create"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("상품 등록에 성공했습니다."));
    }

    @Test
    @DisplayName("상품 등록, with no input")
    void t1_1() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/products")
                        .content("""
                                {
                                    "category": "",
                                    "imageUrl": "",
                                    "productName": "",
                                    "price": ""
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("create"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("""
                        category-NotBlank-must not be blank
                        price-NotBlank-must not be blank
                        productName-NotBlank-must not be blank
                        """.stripIndent().trim()));
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
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("요청이 성공했습니다."))
                .andExpect(status().isOk());

        for(int i = 0; i < products.size(); i++) {
            Product product = products.get(i);

            resultActions
                    .andExpect(jsonPath("$.content[%d].id".formatted(i)).value(product.getId()))
                    .andExpect(jsonPath("$.content[%d].createDate".formatted(i)).value(Matchers.startsWith(product.getCreateDate().toString().substring(0, 23))))
                    .andExpect(jsonPath("$.content[%d].modifyDate".formatted(i)).value(Matchers.startsWith(product.getModifyDate().toString().substring(0, 23))))
                    .andExpect(jsonPath("$.content[%d].productName".formatted(i)).value(product.getProductName()))
                    .andExpect(jsonPath("$.content[%d].price".formatted(i)).value(product.getPrice()))
                    .andExpect(jsonPath("$.content[%d].imageUrl".formatted(i)).value(product.getImageUrl()))
                    .andExpect(jsonPath("$.content[%d].category".formatted(i)).value(product.getCategory()));
        }
    }

    @Test
    @DisplayName("상품 수정 성공")
    void t3_1() throws Exception {
        mvc.perform(put("/products/1")
                        .content("""
                                {
                                    "category": "수정된커피콩",
                                    "imageUrl": "/",
                                    "productName": "수정된 커피콩",
                                    "price": "9999"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        ))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("상품정보가 성공적으로 수정되었습니다."));


    }
    @Test
    @DisplayName("상품 수정 실패")
    void t3_2() throws Exception {

        mvc.perform(put("/products/9999")
                        .content("""
                                {
                                    "category": "수정된커피콩",
                                    "imageUrl": "/",
                                    "productName": "수정된 커피콩",
                                    "price": "9999"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        ))
                .andExpect(jsonPath("$.message").value("해당 상품은 존재하지 않습니다."));


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
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("요청이 성공했습니다."))
                .andExpect(jsonPath("$.content.id").value(product.getId()))
                .andExpect(jsonPath("$.content.createDate").value(Matchers.startsWith(product.getCreateDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.content.modifyDate").value(Matchers.startsWith(product.getModifyDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.content.productName").value(product.getProductName()))
                .andExpect(jsonPath("$.content.price").value(product.getPrice()))
                .andExpect(jsonPath("$.content.imageUrl").value(product.getImageUrl()))
                .andExpect(jsonPath("$.content.category").value(product.getCategory()));
    }

    @Test
    @DisplayName("상품 단건 조회, with not exist id")
    void t4_1() throws Exception {
        ResultActions resultActions = mvc
                .perform(get("/products/100000"))
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(ProductController.class))
                .andExpect(handler().methodName("item"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("해당 상품은 존재하지 않습니다."));
    }

    @Test
    @DisplayName("상품 삭제 성공")
    void t5_1() throws Exception {

        mvc.perform(delete("/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("상품이 성공적으로 삭제되었습니다."));
    }
    @Test
    @DisplayName("상품 삭제 실패 없는 번호")
    void t5_2() throws Exception {

        mvc.perform(delete("/products/-1"))
                .andExpect(jsonPath("$.message").value("해당 상품은 이미 삭제되었거나 존재하지 않습니다."));

    }
    @Test
    @DisplayName("상품 삭제 실패 삭제된 상품")
    void t5_3() throws Exception {
        mvc.perform(delete("/products/1"))
                .andExpect(jsonPath("$.message").value("상품이 성공적으로 삭제되었습니다."));
        mvc.perform(delete("/products/1"))
                .andExpect(jsonPath("$.message").value("해당 상품은 이미 삭제되었거나 존재하지 않습니다."));
    }
}
