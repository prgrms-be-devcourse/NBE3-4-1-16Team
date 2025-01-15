package team16.spring_project1.domain.order.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team16.spring_project1.domain.order.DTO.response.OrderResponseDTO;
import team16.spring_project1.domain.order.Entity.Order;
import team16.spring_project1.domain.order.Service.OrderService;
import team16.spring_project1.global.apiResponse.ApiResponse;
import team16.spring_project1.global.enums.DeliveryStatus;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@Tag(name = "Order Management", description = "주문 관리 API")
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Create Order", description = "새로운 주문을 생성합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(ApiResponse.success(savedOrder));
    }

    @Operation(summary = "Get All Orders", description = "모든 주문 목록을 가져옵니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponseDTO>>> getAllOrder() {
        List<OrderResponseDTO> orders = orderService.getAllOrderDTO();
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @Operation(summary = "Get Orders by Email", description = "이메일을 기준으로 주문 목록을 가져옵니다.")
    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<List<OrderResponseDTO>>> getOrdersByEmail(@RequestParam String email) {
        List<OrderResponseDTO> orders = orderService.getOrdersDTOByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @Operation(summary = "Get Order by ID", description = "주문 ID를 기준으로 특정 주문을 가져옵니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> getOrderById(@PathVariable Long id) {
        OrderResponseDTO order = orderService.getOrderDTOById(id);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @Operation(summary = "Update Order Status", description = "주문 상태를 업데이트합니다.")
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponseDTO>> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        DeliveryStatus deliveryStatus = DeliveryStatus.valueOf(status.toUpperCase());
        OrderResponseDTO updatedOrder = orderService.updateOrderStatus(id, deliveryStatus);
        return ResponseEntity.ok(ApiResponse.success(updatedOrder));
    }

    @Operation(summary = "Delete Order", description = "주문을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteOrder(@PathVariable Long id) {
        boolean exist = orderService.deleteOrder(id);

        if (!exist) {
            return ResponseEntity.ok(ApiResponse.success("주문이 성공적으로 삭제되었습니다."));
        } else {
            return ResponseEntity.ok(ApiResponse.failure("해당 주문은 이미 삭제되었거나 존재하지 않습니다."));
        }
    }
}
