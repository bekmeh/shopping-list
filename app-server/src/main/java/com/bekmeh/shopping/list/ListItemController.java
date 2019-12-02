package com.bekmeh.shopping.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Controller for the ListItem entity. Provides the API with the ability to create, update and delete an item,
 * as well as getting and updating all items.
 */
@RestController
@RequestMapping("items")
public class ListItemController {

    // Access the bean auto-generated using the ListItemRepository interface
    @Autowired
    private ListItemRepository listItemRepository;


    @GetMapping
    public ResponseEntity<Iterable<ListItem>> getAllItems() {
        Iterable<ListItem> items = listItemRepository.findAll(Sort.by("orderIndex"));
        return ResponseEntity.ok().body(items);
    }

    @PutMapping
    public ResponseEntity<Iterable<ListItem>> updateAll(@RequestBody final List<ListItem> items) {
        Iterable<ListItem> newItems = listItemRepository.saveAll(items);
        return ResponseEntity.ok().body(newItems);
    }

    @PostMapping
    public ResponseEntity<ListItem> addItem(@Valid @RequestBody ListItem item) {
        ListItem newItem = listItemRepository.save(item);
        return ResponseEntity.ok().body(newItem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@RequestParam final Long id) {
        Optional<ListItem> item = listItemRepository.findById(id.intValue());

        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListItem> updateItem(@Valid @RequestBody ListItem item) {
        ListItem newItem = listItemRepository.save(item);
        return ResponseEntity.ok().body(newItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        listItemRepository.deleteById(id.intValue());
        return ResponseEntity.ok().build();
    }
}
