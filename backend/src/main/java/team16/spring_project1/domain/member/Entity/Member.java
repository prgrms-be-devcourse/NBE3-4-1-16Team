package team16.spring_project1.domain.member.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;
import team16.spring_project1.global.jpa.entity.BaseTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseTime {
    @Column(unique = true, length = 30)
    private String username;

    @Column(length = 50)
    private String password;

    @Column(unique = true)
    private String apiKey;

    public boolean matchPassword(String password) {
        return this.password.equals(password);
    }
}