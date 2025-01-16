package team16.spring_project1.domain.product.product.DTO;

import lombok.Getter;
import team16.spring_project1.domain.product.product.entity.Product;

import java.time.LocalDateTime;

@Getter
public class ProductDto {
    private long id;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private String productName;
    private int price;
    private String imageUrl;
    private String category;

    public ProductDto(Product product) {
        this.id = product.getId();
        this.createDate = product.getCreateDate();
        this.modifyDate = product.getModifyDate();
        this.productName = product.getProductName();
        this.price = product.getPrice();
        this.imageUrl = product.getImageUrl();
        this.category = product.getCategory();
    }
}
