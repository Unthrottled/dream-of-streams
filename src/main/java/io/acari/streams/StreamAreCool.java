package io.acari.streams;

import java.util.*;
import java.util.function.Function;
import java.util.stream.*;

public class StreamAreCool {

    public static void main(String... args){

        String[] split1 = "aoet suans toexu taoex sutao etusaoe uueoa nxhteauox nhtnxaueo htnkxaeuo haetoxu xaoeu htxhauoe tho aeunhtxeoau htx uaenoxht euao oaueausot ub".split(" ");
        Map<Integer, Set<String>> collect = Stream.of(split1)
                .collect(Collectors.groupingBy(String::length, Collectors.mapping(String::toUpperCase, Collectors.toSet())));
        System.out.println(collect);


        System.out.println("DONE!");
    }
}
