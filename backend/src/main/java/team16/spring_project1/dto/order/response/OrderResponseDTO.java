package team16.spring_project1.dto.order.response;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(
    Long id,
    String email,
    String status,
    int totalPrice,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt,
    List<OrderItemResponseDTO> orderItems
) {}
