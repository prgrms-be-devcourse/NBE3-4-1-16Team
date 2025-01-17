package team16.spring_project1.domain.member.Controller;

import org.hamcrest.Matchers;
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
                .andExpect(jsonPath("$.content.item").exists())
                .andExpect(jsonPath("$.content.item.id").value(member.getId()))
                .andExpect(jsonPath("$.content.item.createDate").value(Matchers.startsWith(member.getCreateDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.content.item.modifyDate").value(Matchers.startsWith(member.getModifyDate().toString().substring(0, 23))))
                .andExpect(jsonPath("$.content.apiKey").value(member.getApiKey()));
    }
}
