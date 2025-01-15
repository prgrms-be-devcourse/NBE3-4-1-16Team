package team16.spring_project1.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import team16.spring_project1.domain.order.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmail(String email);
}
