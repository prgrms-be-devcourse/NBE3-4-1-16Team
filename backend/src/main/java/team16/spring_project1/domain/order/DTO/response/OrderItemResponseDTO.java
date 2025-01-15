package team16.spring_project1.domain.order.DTO.response;

import java.time.LocalDateTime;

public record OrderItemResponseDTO(
        Long id,
        String productName,
        int count,
        int price,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt
) {
    public OrderItemResponseDTO(Long id, String productName, int count, int price, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.id = id;
        this.productName = productName;
        this.count = count;
        this.price = price;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
