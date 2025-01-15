package team16.spring_project1.domain.product.product.Service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team16.spring_project1.domain.product.product.Repository.ProductRepository;
import team16.spring_project1.domain.product.product.entity.Product;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;


    public Product create(String productName, String category, int price, String imageUrl) {
        Optional<Product> _product = this.productRepository.findByProductName(productName);
        if (_product.isPresent()) {
            return null;
        }
        Product product = new Product();
        product.setProductName(productName);
        product.setCategory(category);
        product.setPrice(price);
        product.setImageUrl(imageUrl);
        this.productRepository.save(product);
        return product;
    }
}
