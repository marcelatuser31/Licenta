package Backend.Controller;

import Backend.DTO.LogInDTO;
import Backend.Model.Role;
import Backend.Service.Implementation.RoleServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Role")
public class RoleController {
    private final RoleServiceImplementation roleServiceImplementation;

    @PostMapping("/getPasswordByUsername")
    public ResponseEntity getPasswordByUsername(@RequestBody String username) {
        return ResponseEntity.status(HttpStatus.OK).body(roleServiceImplementation.getPasswordByUsername(username));
    }

    @PostMapping("/LogIn")
    public ResponseEntity LogIn(@RequestBody LogInDTO logInDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(roleServiceImplementation.LogIn(logInDTO));
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(roleServiceImplementation.update(role));
    }

    @PostMapping("/LogOut")
    public void LogOut(@RequestBody UUID id){
        roleServiceImplementation.LogOut(id);
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity forgotPassword(@RequestBody Role role){
        return ResponseEntity.status(HttpStatus.OK).body(roleServiceImplementation.forgotPassword(role));
    }
}