package team16.spring_project1.domain.product.product.Controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.product.product.DTO.RestResponse;
import team16.spring_project1.domain.product.product.Service.ProductService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    }

    @Test
    @DisplayName("상품 수정")
    void t3() throws Exception {
        RestResponse restResponse = new RestResponse().builder()
                .productName("수정된 커피콩")
                .imageUrl("/")
                .category("수정된커피콩")
                .price(9999)
                .build();
        mvc.perform(put("/product/원두커피 베트남 로부스타 G1 1kg 커피창고 고소한 맛있는 홀빈 콩")
                        .flashAttr("RestResponse", restResponse))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("성공"));


    }
}
