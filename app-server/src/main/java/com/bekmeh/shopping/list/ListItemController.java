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

    /**
     * Retrieve all items, sorted by the "orderIndex" property.
     * @return A response entity containing an iterable list of {@link ListItem}s or an error response.
     */
    @GetMapping
    public ResponseEntity<Iterable<ListItem>> getAllItems() {
        Iterable<ListItem> items = listItemRepository.findAll(Sort.by("orderIndex"));
        return ResponseEntity.ok().body(items);
    }

    /**
     * Update all list items.
     * @param items An updated list of ListItems.
     * @return A response entity containing an updated iterable list of {@link ListItem}s  or an error response.
     */
    @PutMapping
    public ResponseEntity<Iterable<ListItem>> updateAll(@RequestBody final List<ListItem> items) {
        Iterable<ListItem> newItems = listItemRepository.saveAll(items);
        return ResponseEntity.ok().body(newItems);
    }

    /**
     * Add a new item.
     * @param item The {@link ListItem} to be added.
     * @return A response entity containing the new {@link ListItem} or an error response.
     */
    @PostMapping
    public ResponseEntity<ListItem> addItem(@Valid @RequestBody ListItem item) {
        ListItem newItem = listItemRepository.save(item);
        return ResponseEntity.ok().body(newItem);
    }

    /**
     * Retrieve an item.
     * @param id The ID of the item to retrieve.
     * @return A response entity containing the {@link ListItem} or an error response.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@RequestParam final Long id) {
        Optional<ListItem> item = listItemRepository.findById(id.intValue());

        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Update an item with ID specified in the path.
     * @param item The updated item.
     * @return A response entity containing the updated {@link ListItem} or an error response.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ListItem> updateItem(@Valid @RequestBody ListItem item) {
        ListItem newItem = listItemRepository.save(item);
        return ResponseEntity.ok().body(newItem);
    }

    /**
     * Delete an item.
     * @param id The ID of the item to delete.
     * @return A response entity containing a success or an error response.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        listItemRepository.deleteById(id.intValue());
        return ResponseEntity.ok().build();
    }
}
