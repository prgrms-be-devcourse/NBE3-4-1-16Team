package team16.spring_project1.domain.product.product.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestResponse {
    private String productName;
    private String category;
    private int price;
    private String imageUrl;
}
