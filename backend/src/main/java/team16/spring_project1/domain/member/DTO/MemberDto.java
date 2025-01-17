package team16.spring_project1.domain.member.DTO;

import lombok.Getter;
import org.springframework.lang.NonNull;
import team16.spring_project1.domain.member.Entity.Member;

import java.time.LocalDateTime;

@Getter
public class MemberDto {
    @NonNull
    private final long id;
    @NonNull
    private final LocalDateTime createDate;
    @NonNull
    private final LocalDateTime modifyDate;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.createDate = member.getCreateDate();
        this.modifyDate = member.getModifyDate();
    }
}
