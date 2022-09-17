package Backend.Service.Implementation;

import Backend.DTO.LogInDTO;
import Backend.DTO.OrderDTO;
import Backend.Model.Cake;
import Backend.Model.Order;
import Backend.Model.Person;
import Backend.Model.Role;
import Backend.Repository.CakeRepository;
import Backend.Repository.OrderRepository;
import Backend.Repository.RoleRepository;
import Backend.Service.RoleService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImplementation implements RoleService {
    private final RoleRepository roleRepository;
    private final CakeRepository cakeRepository;
    private final OrderRepository orderRepository;

    @Override
    public Role readById(Long id) {
        return roleRepository.findAllById(id);
    }

    @Override
    public String getPasswordByUsername(String username) {
        return roleRepository.findFirstByUsername(username).getPassword();
    }

    @Override
    public String LogIn(LogInDTO logInDTO) {
        String password = roleRepository.findFirstByUsername(logInDTO.getUsername()).getPassword();
        if (password.equals(logInDTO.getPassword()))
        {
            return logInDTO.getUsername();
        }
        return null;
    }
    @Override
    public Role update(Role role) {
        Role dbRole=roleRepository.findAllById(role.getId());

        dbRole.setUsername(role.getUsername());
        dbRole.setPassword(role.getPassword());
        dbRole.setType(role.getType());
        roleRepository.save(dbRole);
        return dbRole;
    }

}
