package team16.spring_project1.domain.product.product.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team16.spring_project1.domain.product.product.DTO.ProductDto;
import team16.spring_project1.domain.product.product.DTO.ProductRequest;
import team16.spring_project1.domain.product.product.DTO.RestResponseMessage;
import team16.spring_project1.domain.product.product.Service.ProductService;
import team16.spring_project1.domain.product.product.entity.Product;
import team16.spring_project1.global.exceptions.DataNotFoundException;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/products")
@RestController
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    public RestResponseMessage create(@RequestBody @Valid ProductRequest productRequest){
        productService.create(productRequest);
        return new RestResponseMessage("성공");
    }


    @GetMapping
    public List<ProductDto> items() {
        return productService.findAll()
                .stream()
                .map(ProductDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ProductDto item(@PathVariable long id) {
        Product product = productService.findById(id).orElseThrow(
                () -> new DataNotFoundException("해당 제품을 찾을 수 없습니다.")
        );

        return new ProductDto(product);
    }


    @PutMapping("/{id}")
    public RestResponseMessage modify(@Valid ProductRequest productRequest, @PathVariable("id") long id){
        Product product = productService.findById(id).get();
        product =  productService.modify(product,productRequest);
        if(product == null)
            return new RestResponseMessage("실패");
        return new RestResponseMessage("성공");
    }

    @DeleteMapping("/{id}")
    public  RestResponseMessage delete(@PathVariable long id){
        Product product = productService.findById(id).get();
        boolean b =  productService.delete(product);
        if(!b)
            return new RestResponseMessage("실패");
        return new RestResponseMessage("성공");
    }
}
