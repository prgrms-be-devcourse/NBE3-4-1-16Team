package team16.spring_project1.domain.product.product.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team16.spring_project1.domain.product.product.DTO.RestResponseMessage;
import team16.spring_project1.domain.product.product.DTO.RestResponse;
import team16.spring_project1.domain.product.product.Service.ProductService;



@RequiredArgsConstructor
@RequestMapping("/product")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/")
    public RestResponseMessage create(@Valid RestResponse restResponse){
        String category =  restResponse.getCategory();
        String imageUrl = restResponse.getImageUrl();
        String productName = restResponse.getProductName();
        int price = restResponse.getPrice();
        productService.create(productName,category,price,imageUrl);
        return new RestResponseMessage("성공");
    }
}
