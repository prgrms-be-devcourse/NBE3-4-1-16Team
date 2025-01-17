package team16.spring_project1.domain.member.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team16.spring_project1.domain.member.Entity.Member;
import team16.spring_project1.domain.member.Repository.MemberRepository;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public long count() {
        return memberRepository.count();
    }

    public Member join(String username, String password) {
        Member member = Member
                .builder()
                .username(username)
                .password(password)
                .apiKey(UUID.randomUUID().toString())
                .build();

        return memberRepository.save(member);
    }

    public Optional<Member> findByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    public Optional<Member> findByApiKey(String apiKey) {
        return memberRepository.findByApiKey(apiKey);
    }
}
