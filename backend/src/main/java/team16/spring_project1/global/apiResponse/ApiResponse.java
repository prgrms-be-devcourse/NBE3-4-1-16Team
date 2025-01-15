package team16.spring_project1.global.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ApiResponse<Content> {
    private boolean success;
    private String message;
    private Content Content;

    public static <Content> ApiResponse<Content> success(Content Content) {
        return new ApiResponse<>(true, "요청이 성공했습니다.", Content);
    }

    public static <Content> ApiResponse<Content> success(String message, Content Content) {
        return new ApiResponse<>(true, message, Content);
    }

    public static <Content> ApiResponse<Content> failure() {
        return new ApiResponse<>(false, "요청에 실패하였습니다.", null);
    }

    public static <Content> ApiResponse<Content> failure(String message) {
        return new ApiResponse<>(false, message, null);
    }

    public static <Content> ApiResponse<Content> failure(Content Content) {
        return new ApiResponse<>(false, "요청에 실패하였습니다.", Content);
    }

    public static <Content> ApiResponse<Content> failure(String message, Content Content) {
        return new ApiResponse<>(false, message, Content);
    }

}
