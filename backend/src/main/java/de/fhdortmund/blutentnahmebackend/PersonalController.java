package de.fhdortmund.blutentnahmebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonalController {
    @Autowired
    private PersonalRepository personalRepository;

    @GetMapping("/get")
    public Personal get() {
        return personalRepository.getReferenceById(1L);
    }
}
