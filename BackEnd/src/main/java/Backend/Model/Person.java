package Backend.Model;

import Backend.Utils.RoleType;
import lombok.*;

import javax.persistence.*;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
@Data
public class Person {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private String address;
    private String phone;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Role role;
    private boolean isActive;

}
