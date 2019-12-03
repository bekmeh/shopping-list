package com.bekmeh.shopping.list;

import org.springframework.web.bind.annotation.*;

/**
 * Controller for the base path.
 */
@RestController
public class HomeController {

    @RequestMapping("/")
    public @ResponseBody String greeting() {
        return "Welcome!";
    }
}
