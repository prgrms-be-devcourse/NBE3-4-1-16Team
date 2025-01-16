package team16.spring_project1.domain.product.product.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest{
    @NotBlank
    private String productName;
    @NotBlank
    private String category;
    @NotBlank
    private String price;
    private String imageUrl;
}
