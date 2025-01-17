package team16.spring_project1.domain.member.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team16.spring_project1.domain.member.Entity.Member;
import team16.spring_project1.domain.member.Service.MemberService;
import team16.spring_project1.global.apiResponse.ApiResponse;
import team16.spring_project1.global.exceptions.PasswordMismatchException;

import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Tag(name = "MemberController", description = "회원 관리 API")
public class MemberController {
    private final MemberService memberService;

    record MemberLoginReqBody(
            @NotBlank
            String username,

            @NotBlank
            String password
    ) {}

    record MemberLoginResBody(
            @NonNull
            String username,
            @NonNull
            String apiKey,
            @NonNull
            String accessToken
    ) {}

    @PostMapping("/login")
    @Transactional(readOnly = true)
    @Operation(summary = "User Login", description = "apiKey, accessToken을 발급합니다. 해당 토큰들은 쿠키(HTTP-ONLY)로도 전달됩니다.")
    public ResponseEntity<ApiResponse<MemberLoginResBody>> login(
            @RequestBody @Valid MemberLoginReqBody reqBody
    ) {
        Member member = memberService
                .findByUsername(reqBody.username)
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 사용자입니다."));

        if(!member.matchPassword(reqBody.password))
            throw new PasswordMismatchException("비밀번호가 일치하지 않습니다.");

        String accessToken = memberService.getAccessToken(member);

        //rq.setCookie("accessToken", accessToken);
       // rq.setCookie("apiKey", member.getApiKey());

        return ResponseEntity.ok(ApiResponse.success(
                new MemberLoginResBody(
                        member.getUsername(),
                        member.getApiKey(),
                        accessToken
                )
        ));
    }
}
