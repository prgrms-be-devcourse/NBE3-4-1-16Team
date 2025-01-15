package team16.spring_project1.domain.order.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import team16.spring_project1.global.jpa.entity.BaseTime;

@Entity
@Getter
@Setter
@Table(name = "order_item")
@NoArgsConstructor
public class OrderItem extends BaseTime {

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Order order;

    @Column(name = "product_name", nullable = false)
    @Schema(description = "상품 이름", example = "원두 1")
    private String productName;

    @Column(nullable = false)
    @Min(1)
    @Schema(description = "상품 수량 (1 이상)", example = "1")
    private int count;

    @Column(nullable = false)
    @Min(1)
    @Schema(description = "상품 가격 (1 이상)", example = "1000")
    private int price;

    public int calculateTotalPrice() {
        return count * price;
    }
}
