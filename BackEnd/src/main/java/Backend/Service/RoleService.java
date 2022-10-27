package Backend.Service;

import Backend.DTO.LogInDTO;
import Backend.DTO.OrderDTO;
import Backend.Model.Person;
import Backend.Model.Role;
import org.springframework.stereotype.Component;

@Component
public interface RoleService {
    Role readById(Long id);
    String getPasswordByUsername(String username);
    Person LogIn(LogInDTO logInDTO);
    Role update(Role role);
    void LogOut(Long id);
}
