package Backend.Service;

import Backend.DTO.LogInDTO;
import Backend.DTO.OrderDTO;
import Backend.Model.Role;
import org.springframework.stereotype.Component;

@Component
public interface RoleService {
    Role readById(Long id);
    String getPasswordByUsername(String username);
    String LogIn(LogInDTO logInDTO);
    Role update(Role role);
}
