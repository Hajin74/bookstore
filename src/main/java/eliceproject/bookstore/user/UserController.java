package eliceproject.bookstore.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/register")
    public String registerForm() {
        return "register/register.html";
    }

    @PostMapping("/register")
    public String register(@RequestBody @Valid UserDto userDto, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                log.info(error.getObjectName() + " : " + error.getDefaultMessage());
            }
            throw new IllegalArgumentException("유효성 검사 실패");
        }

        try {
            userService.save(userDto);
            log.info("save success");
        } catch (IllegalStateException e) {
            model.addAttribute("errorMessage", e.getMessage());
            log.info(e.getMessage());
            return "register/register.html";
        }

        for (User user : userService.findAll()) {
            log.info(user.toString());
        }

        return "/login/login.html";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login/login.html";
    }

    @GetMapping("/findUserId")
    public String findUserIdForm() {
        return "find-user-info/find-userId.html";
    }

    @GetMapping("/findPassword")
    public String findPasswordForm() {
        return "find-user-info/find-password.html";
    }
}