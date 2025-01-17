package team16.spring_project1.domain.member.Controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import team16.spring_project1.domain.member.Entity.Member;
import team16.spring_project1.domain.member.Service.MemberService;

import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Transactional
public class MemberControllerTest {
    @Autowired
    MemberService memberService;
    @Autowired
    private MockMvc mvc;

    @Test
    @DisplayName("로그인")
    void t1() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/members/login")
                        .content("""
                                {
                                    "username": "admin",
                                    "password": "1234"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        Member member = memberService.findByUsername("admin").get();

        resultActions
                .andExpect(handler().handlerType(MemberController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("요청이 성공했습니다."))
                .andExpect(jsonPath("$.content").exists())
                .andExpect(jsonPath("$.content.username").value(member.getUsername()))
                .andExpect(jsonPath("$.content.apiKey").value(member.getApiKey()))
                .andExpect(jsonPath("$.content.accessToken").exists());
    }

    @Test
    @DisplayName("로그인 without username")
    void t2() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/members/login")
                        .content("""
                                {
                                    "username": "",
                                    "password": "1234"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(MemberController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("username-NotBlank-must not be blank"));
    }

    @Test
    @DisplayName("로그인 without password")
    void t3() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/members/login")
                        .content("""
                                {
                                    "username": "admin",
                                    "password": ""
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(MemberController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("password-NotBlank-must not be blank"));
    }

    @Test
    @DisplayName("로그인 wrong username")
    void t4() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/members/login")
                        .content("""
                                {
                                    "username": "user0",
                                    "password": "1234"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(MemberController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("존재하지 않는 사용자입니다."));
    }

    @Test
    @DisplayName("로그인 wrong password")
    void t5() throws Exception {
        ResultActions resultActions = mvc
                .perform(post("/members/login")
                        .content("""
                                {
                                    "username": "admin",
                                    "password": "1111"
                                }
                                """.stripIndent())
                        .contentType(
                                new MediaType(MediaType.APPLICATION_JSON, StandardCharsets.UTF_8)
                        )
                )
                .andDo(print());

        resultActions
                .andExpect(handler().handlerType(MemberController.class))
                .andExpect(handler().methodName("login"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("비밀번호가 일치하지 않습니다."));
    }
}
