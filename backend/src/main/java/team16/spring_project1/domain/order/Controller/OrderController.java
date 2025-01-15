package team16.spring_project1.domain.order.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team16.spring_project1.domain.order.DTO.response.OrderResponseDTO;
import team16.spring_project1.domain.order.Entity.Order;
import team16.spring_project1.global.enums.DeliveryStatus;
import team16.spring_project1.domain.order.Service.order.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
@Tag(name = "Order Management", description = "주문 관리 API")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Create Order", description = "새로운 주문을 생성합니다.")
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @Operation(summary = "Get All Orders", description = "모든 주문 목록을 가져옵니다.")
    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrder() {
        List<OrderResponseDTO> orders = orderService.getAllOrderDTO();
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Get Orders by Email", description = "이메일을 기준으로 주문 목록을 가져옵니다.")
    @GetMapping("/by-email")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByEmail(@RequestParam String email) {
        List<OrderResponseDTO> orders = orderService.getOrdersDTOByEmail(email);
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Get Order by ID", description = "주문 ID를 기준으로 특정 주문을 가져옵니다.")
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        OrderResponseDTO order = orderService.getOrderDTOById(id);
        return ResponseEntity.ok(order);
    }

    @Operation(summary = "Update Order Status", description = "주문 상태를 업데이트합니다.")
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        DeliveryStatus deliveryStatus = DeliveryStatus.valueOf(status.toUpperCase());
        OrderResponseDTO updatedOrder = orderService.updateOrderStatus(id, deliveryStatus);
        return ResponseEntity.ok(updatedOrder);
    }

    @Operation(summary = "Delete Order", description = "주문을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
