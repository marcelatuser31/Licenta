package Backend.Service;

import Backend.DTO.LogInDTO;
import Backend.DTO.OrderDTO;
import Backend.Model.Person;
import Backend.Model.Role;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface RoleService {
    Role readById(UUID id);
    String getPasswordByUsername(String username);
    Person LogIn(LogInDTO logInDTO);
    Role update(Role role);
    void LogOut(UUID id);
    Role forgotPassword(Role role);
}