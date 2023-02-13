package Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class MainClass extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(MainClass.class, args);
    }
}
