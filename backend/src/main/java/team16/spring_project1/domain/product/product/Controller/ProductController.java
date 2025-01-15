package team16.spring_project1.domain.product.product.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team16.spring_project1.domain.product.product.DTO.ProductDto;
import team16.spring_project1.domain.product.product.DTO.RestResponse;
import team16.spring_project1.domain.product.product.DTO.RestResponseMessage;
import team16.spring_project1.domain.product.product.Service.ProductService;
import team16.spring_project1.domain.product.product.entity.Product;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/products")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    public RestResponseMessage create(@RequestBody @Valid RestResponse restResponse){
        String category =  restResponse.getCategory();
        String imageUrl = restResponse.getImageUrl();
        String productName = restResponse.getProductName();
        int price = restResponse.getPrice();
        productService.create(productName,category,price,imageUrl);
        return new RestResponseMessage("성공");
    }


    @GetMapping
    public List<ProductDto> items() {
        return productService.findAll()
                .stream()
                .map(ProductDto::new)
                .toList();
    }


    @PutMapping("/{modifyProductName}")
    public RestResponseMessage modify(@Valid RestResponse restResponse, @PathVariable("modifyProductName") String modifyProductName){
        String category =  restResponse.getCategory();
        String imageUrl = restResponse.getImageUrl();
        String productName = restResponse.getProductName();
        int price = restResponse.getPrice();
        Product product =  productService.modify(modifyProductName,productName, category, price, imageUrl);
        if(product == null)
            return new RestResponseMessage("실패");
        return new RestResponseMessage("성공");
    }
}
