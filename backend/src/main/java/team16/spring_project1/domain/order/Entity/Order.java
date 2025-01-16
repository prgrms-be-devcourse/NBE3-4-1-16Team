package team16.spring_project1.domain.order.Entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import team16.spring_project1.global.enums.DeliveryStatus;
import team16.spring_project1.global.jpa.entity.BaseTime;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order extends BaseTime {

    @Email
    @NotBlank
    @Schema(description = "이메일", example = "test@gmail.com")
    private String email;

    @Enumerated(EnumType.STRING)
    @NotBlank
    @Schema(description = "상품 상태", example = "PAYMENT_COMPLETED")
    private DeliveryStatus status;

    @Schema(description = "주문 금액", example = "1000")
    @NotBlank
    @Min(1)
    private int totalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @Schema(description = "주문에 포함된 상품 목록")
    private List<OrderItem> orderItems = new ArrayList<>();
}
