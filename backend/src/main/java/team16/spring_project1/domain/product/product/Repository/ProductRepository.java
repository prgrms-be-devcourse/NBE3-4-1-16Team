package team16.spring_project1.domain.product.product.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team16.spring_project1.domain.product.product.entity.Product;

import java.util.Optional;

public interface  ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductName(String productName);

}
