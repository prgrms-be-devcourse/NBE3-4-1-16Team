package team16.spring_project1.domain.order.Controller;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import team16.spring_project1.domain.order.Entity.Order;
import team16.spring_project1.domain.order.Entity.OrderItem;
import team16.spring_project1.domain.order.Service.OrderService;
import team16.spring_project1.global.enums.DeliveryStatus;

import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class OrderControllerTest {
    @Autowired
    private OrderService orderService;
    @Autowired
    private MockMvc mvc;

    @Test
    @DisplayName("Post) 주문 생성 성공")
    void t1() throws Exception {
        //테스트 데이터 설정
        String email = "test@gmail.com";
        String status = "COMPLETED";
        int totalPrice = 50000;
        String productName = "원두";
        int count = 5;
        int price = 10000;

        ResultActions resultActions = mvc
                .perform(
                        post("/order")
                                .content(String.format("""    
                                        {
                                          "email": "%s",
                                          "status": "%s",
                                          "totalPrice": %d,
                                          "orderItems": [
                                            {
                                              "productName": "%s",
                                              "count": %d,
                                              "price": %d
                                            }
                                          ]
                                        }
                                        """, email, status, totalPrice, productName, count, price).stripIndent()
                                )
                                .contentType(
                                        new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                                )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("createOrder"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value((true)))
                .andExpect(jsonPath("$.content.email").value("test@gmail.com"))
                .andExpect(jsonPath("$.content.status").value("COMPLETED"))
                .andExpect(jsonPath("$.content.totalPrice").value(50000))
                .andExpect(jsonPath("$.content.orderItems[0].productName").value("원두"))
                .andExpect(jsonPath("$.content.orderItems[0].count").value(5))
                .andExpect(jsonPath("$.content.orderItems[0].price").value(10000));
    }

    @Test
    @DisplayName("Post) 주문 생성 실패")
    void t2() throws Exception {
        //잘못된 데이터 설정
        String wrongPrice = "not-a-number";

        ResultActions resultActions = mvc
                .perform(
                        post("/order")
                                .content(String.format("""    
                                        {
                                          "email": "test@gmail.com",
                                          "status": "COMPLETED",
                                          "totalPrice": %s,
                                          "orderItems": [
                                            {
                                              "productName": "원두",
                                              "count": 5,
                                              "price": 10000
                                            }
                                          ]
                                        }
                                        """, wrongPrice).stripIndent()
                                )
                                .contentType(
                                        new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                                )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("createOrder"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Get) 모든 주문 조회")
    void t3() throws Exception {
        //모든 주문 조회
        List<Order> orders = orderService.getAllOrders();

        ResultActions resultActions = mvc
                .perform(
                        get("/order")
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("getAllOrder"))
                .andExpect(status().isOk());

        //주문 정보 검증
        for (int i = 1; i <= orders.size(); i++) {
            Order order = orders.get(i - 1);
            List<OrderItem> orderItems = order.getOrderItems();

            resultActions
                    .andExpect(jsonPath(String.format("$.[%d].email", i - 1)).value(order.getEmail()))
                    .andExpect(jsonPath(String.format("$.[%d].status", i - 1)).value(order.getStatus().toString()))
                    .andExpect(jsonPath(String.format("$.[%d].totalPrice", i - 1)).value(order.getTotalPrice()));

            //주문 상품 정보 검증
            for (int j = 1; j <= orderItems.size(); j++) {
                OrderItem orderItem = orderItems.get(j - 1);

                resultActions
                        .andExpect(jsonPath(String.format("$.[%d].orderItems[%d].productName", i - 1, j - 1)).value(orderItem.getProductName()))
                        .andExpect(jsonPath(String.format("$.[%d].orderItems[%d].count", i - 1, j - 1)).value(orderItem.getCount()))
                        .andExpect(jsonPath(String.format("$.[%d].orderItems[%d].price", i - 1, j - 1)).value(orderItem.getPrice()));
            }
        }
    }

    @Test
    @DisplayName("Get) 이메일 기준 주문 조회 성공")
    void t4() throws Exception {
        //존재하는 모든 이메일 정보 수집
        HashSet<String> emails = orderService.getAllOrders().stream()
                .map(Order::getEmail)
                .collect(Collectors.toCollection(HashSet::new));

        //존재하는 모든 이메일에 대한 주문 조회
        for (String email : emails) {
            ResultActions resultActions = mvc
                    .perform(
                            get("/order/by-email")
                                    .param("email", email)
                    )
                    .andDo(print());

            resultActions
                    .andExpect(handler().handlerType(OrderController.class))
                    .andExpect(handler().methodName("getOrdersByEmail"))
                    .andExpect(status().isOk())
                    /*
                    * 이메일에 대해서만 검증
                    * 자세한 검증은 t3에서 수행한 바가 있으므로 생략
                    */
                    .andExpect(jsonPath("$.[*].email").value(email));
        }
    }

    @Test
    @DisplayName("Get) 이메일 기준 주문 조회 실패")
    void t5() throws Exception {
        //존재하지 않는 이메일 설정
        String dummyEmail = "not-my-email@gmail.com";

        //이메일 기준 주문 조회
        ResultActions resultActions = mvc
                .perform(
                        get("/order/by-email")
                                .param("email", dummyEmail)
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("getOrdersByEmail"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty()); //조회된 주문이 없는지 검증
    }

    @Test
    @DisplayName("Get) ID 기준 주문 조회 성공")
    void t6() throws Exception {
        //모든 주문 ID 수집
        List<Long> orderIds = orderService.getAllOrders().stream()
                .map(Order::getId)
                .collect(Collectors.toList());

        //모든 주문 ID에 대한 주문 조회
        for (Long orderId : orderIds) {
            ResultActions resultActions = mvc
                    .perform(
                            get("/order/" + orderId)
                    )
                    .andDo(print());

            resultActions
                    .andExpect(handler().handlerType(OrderController.class))
                    .andExpect(handler().methodName("getOrderById"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(orderId)); //조회한 ID와 주문의 ID가 일치하는지 검증
        }
    }

    @Test
    @DisplayName("Get) ID 기준 주문 조회 실패")
    //수정 필요
    void t7() throws Exception {
        //존재하지 않는 ID 설정
        Long wrongId = 0L;

        //주문 조회, 수정 필요?
        try {
            ResultActions resultActions = mvc
                    .perform(
                            get("/order/" + wrongId)
                    )
                    .andDo(print());
        } catch (Exception e) {
            Assertions.assertEquals("Request processing failed: java.lang.RuntimeException: Order not found", e.getMessage());
        }

        /*
        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("getOrderById"))
                .andExpect(status().is5xxServerError())
                .andExpect(jsonPath("$.message").value("Order not found"));
         */
    }

    @Test
    @DisplayName("Put) 주문 상태 변경 성공")
    void t8() throws Exception {
        /*
        * 무작위 주문을 추출
        * 해당 주문의 상태를 다음 상태로 변경
        */
        List<Order> orders = orderService.getAllOrders();
        Order randomOrder = orders.get(new Random().nextInt(orders.size()));
        DeliveryStatus oldStatus = randomOrder.getStatus();
        DeliveryStatus newStatus = DeliveryStatus.values()[(oldStatus.ordinal() + 1) % DeliveryStatus.values().length];

        ResultActions resultActions = mvc
                .perform(
                        put("/order/" + randomOrder.getId() + "/status")
                                .param("status", newStatus.toString())
                ).andDo(print());

        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("updateOrderStatus"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(newStatus.toString())); //상태가 변경되었는지 검증
    }

    @Test
    @DisplayName("Put) 주문 상태 변경 실패")
    //수정 필요
    void t9() throws Exception {
        /*
        * 존재하지 않는 ID에 대해서는 t7에서 테스트한 바가 있음
        * 따라서 존재하지 않는 상태에 대해서만 테스트
        */
        String wrongStatus = "NOT-EXISTING-STATUS";

        /*랜덤한 주문 상태를 잘못된 상태로 변경
        * 수정 필요
        assertThatThrownBy(() -> mvc
                .perform(
                        put("/order/" + new Random(orderService.getAllOrders().size()) + "/status")
                                .param("status", wrongStatus)
                ).andDo(print()
                )).isInstanceOf(Exception.class);
         */
    }

    @Test
    @DisplayName("Delete) 주문 삭제 성공")
    void t10() throws Exception {
        //랜덤한 주문 추출
        List<Order> orders = orderService.getAllOrders();
        Order randomOrder = orders.get(new Random().nextInt(orders.size()));

        //랜덤한 주문 삭제
        ResultActions resultActions = mvc
                .perform(
                        delete("/order/" + randomOrder.getId())
                )
                .andDo(print());

        //Response 검증
        resultActions
                .andExpect(handler().handlerType(OrderController.class))
                .andExpect(handler().methodName("deleteOrder"))
                .andExpect(status().isNoContent());

        //제대로 삭제되었는지 검증
        assertThatThrownBy(() -> orderService.getOrderById(randomOrder.getId()))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("Delete) 주문 삭제 실패")
    //작성 필요
    void t11() throws Exception {

    }
}
