package team16.spring_project1.service.order;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.order.Order;
import team16.spring_project1.domain.order.OrderItem;
import team16.spring_project1.dto.order.response.OrderItemResponseDTO;
import team16.spring_project1.dto.order.response.OrderResponseDTO;
import team16.spring_project1.global.enums.DeliveryStatus;
import team16.spring_project1.repository.order.OrderRepository;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order createOrder(Order order) {

        for (OrderItem item : order.getOrderItems()) {
            item.setOrder(order);
        }

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrderDTO() {
        return orderRepository.findAll()
                .stream()
                .map(this::toOrderResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersDTOByEmail(String email) {
        return orderRepository.findByEmail(email)
                .stream()
                .map(this::toOrderResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderDTOById(Long id) {
        return orderRepository.findById(id)
                .map(this::toOrderResponseDTO)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public OrderResponseDTO updateOrderStatus(Long id, DeliveryStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return toOrderResponseDTO(updatedOrder); // DTO로 변환하여 반환
    }

    @Transactional
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    private OrderResponseDTO toOrderResponseDTO(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                order.getEmail(),
                order.getStatus().name(),
                order.getTotalPrice(),
                order.getCreateDate(),
                order.getModifyDate(),
                order.getOrderItems().stream()
                        .map(this::toOrderItemResponseDTO)
                        .toList()
        );
    }

    private OrderItemResponseDTO toOrderItemResponseDTO(OrderItem item) {
        return new OrderItemResponseDTO(
                item.getId(),
                item.getProductName(),
                item.getCount(),
                item.getPrice(),
                item.getCreateDate(),
                item.getModifyDate()
        );
    }

}
