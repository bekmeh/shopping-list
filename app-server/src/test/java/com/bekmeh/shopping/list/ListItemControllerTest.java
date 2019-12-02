package com.bekmeh.shopping.list;

import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ListItemControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ListItemRepository listItemRepository;

    @InjectMocks
    private ListItemController listItemController;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(listItemController)
                .build();
    }

    @Test
    public void contextLoads() {
        Assert.assertNotNull(listItemController);
    }

    @Test
    void getAllItems() throws Exception {
        ListItem testItem = new ListItem();
        testItem.setName("Test name");
        testItem.setPrice(3.44);
        testItem.setId(12345);

        List<ListItem> testItemList = Arrays.asList(testItem);

        Mockito.when(listItemRepository.findAll(Sort.by("orderIndex")))
                .thenReturn(testItemList);

        Gson gson = new Gson();
        String json = gson.toJson(testItemList);
        mockMvc.perform(get("/items")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(json))
                .andExpect(status().isOk());
    }

    @Test
    void updateAll() throws Exception {
        ListItem testItem1 = new ListItem();
        testItem1.setName("Test name");
        testItem1.setPrice(3.44);
        testItem1.setId(12345);

        ListItem testItem = new ListItem();
        testItem.setName("Test name 2");
        testItem.setPrice(8.77);
        testItem.setId(12345);

        List<ListItem> testItemList = new ArrayList<>();
        testItemList.add(testItem);

        Mockito.when(listItemRepository.saveAll(Mockito.any(List.class))).thenReturn(testItemList);

        Gson gson = new Gson();
        String json1 = gson.toJson(new ArrayList<>());
        String json2 = gson.toJson(testItemList);
        mockMvc.perform(put("/items")
                .contentType(MediaType.APPLICATION_JSON).content(json1))
                .andExpect(content().json(json2))
                .andExpect(status().isOk());
    }
}