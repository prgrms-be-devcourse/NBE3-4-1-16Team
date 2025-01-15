package team16.spring_project1.domain.order.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team16.spring_project1.domain.order.Entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmail(String email);
}
