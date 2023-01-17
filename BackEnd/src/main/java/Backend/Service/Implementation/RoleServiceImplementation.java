package Backend.Service.Implementation;

import Backend.DTO.LogInDTO;
import Backend.Model.Person;
import Backend.Model.Role;
import Backend.Repository.CakeRepository;
import Backend.Repository.OrderRepository;
import Backend.Repository.PersonRepository;
import Backend.Repository.RoleRepository;
import Backend.Service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoleServiceImplementation implements RoleService {
    private final RoleRepository roleRepository;
    private final CakeRepository cakeRepository;
    private final OrderRepository orderRepository;
    private final PersonRepository personRepository;
    private final PersonServiceImplementation personServiceImplementation;

    @Override
    public Role readById(UUID id) {
        return roleRepository.findAllById(id);
    }

    @Override
    public String getPasswordByUsername(String username) {
        return roleRepository.findFirstByUsername(username).getPassword();
    }

    @Override
    @Transactional
    public Person LogIn(LogInDTO logInDTO) {
        Role role = roleRepository.findFirstByUsername(logInDTO.getUsername());
        if (role == null) {
            return null;
        }

        String password = role.getPassword();
        Person person = personRepository.findFirstByRole(role);
        if (person == null) {
            return null;
        }

        if (password.equals(logInDTO.getPassword())) {
            person.setActive(true);
            return person;
        } else {
            person.setActive(false);
            return null;
        }
    }

    @Override
    public Role update(Role role) {
        Role dbRole = roleRepository.findAllById(role.getId());

        dbRole.setUsername(role.getUsername());
        dbRole.setPassword(role.getPassword());
        dbRole.setType(role.getType());
        roleRepository.save(dbRole);
        return dbRole;
    }

    @Override
    @Transactional
    public void LogOut(UUID id) {
        Person person = personRepository.findFirstById(id);
        person.setActive(false);
    }

    @Override
    public Role forgotPassword(Role role) {
        Role dbRole = roleRepository.findFirstByEmail(role.getEmail());
        if (dbRole != null) {
            String message = "Your password is:" + "<br/>" + dbRole.getPassword();
            personServiceImplementation.sendEmail(role.getEmail(), message, "Forgot Password");
            return dbRole;
        } else {
            return null;
        }
    }
}