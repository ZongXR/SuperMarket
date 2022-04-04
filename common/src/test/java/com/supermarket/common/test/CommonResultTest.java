package com.supermarket.common.test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.vo.CommonResult;
import org.junit.Test;

public class CommonResultTest {

    @Test
    public void testCommonResult() throws JsonProcessingException {
        CommonResult<Object> result = CommonResult.failed("怎么回事?");
        ObjectMapper mapper = new ObjectMapper();
        String s = mapper.writeValueAsString(result);
        System.out.println(s);
    }
}
