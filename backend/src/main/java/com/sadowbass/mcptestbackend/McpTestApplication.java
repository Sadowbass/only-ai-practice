package com.sadowbass.mcptestbackend;

import com.sadowbass.mcptestbackend.domain.user.entity.User;
import com.sadowbass.mcptestbackend.domain.user.entity.UserRoleEnum;
import com.sadowbass.mcptestbackend.domain.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class McpTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(McpTestApplication.class, args);
	}

	@Bean
	@Profile("!test")
	public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return (args) -> {
			// Create Admin User if not exists
			if (!userRepository.existsByLoginId("admin")) {
				User admin = User.builder()
						.loginId("admin")
						.password(passwordEncoder.encode("admin"))
						.role(UserRoleEnum.ADMIN)
						.build();
				userRepository.save(admin);
			}
		};
	}
}
