package io.acari.streams;

import java.util.LinkedList;
import java.util.stream.Stream;

public class StreamDreams {

  public static void main(String... args) {

    LinkedList<Integer> numbers = Stream.iterate(1, a -> ++a)
        .limit(6)
        .collect(
            () -> new LinkedList<>(),//Supplies the collection to store results
            (list, streamItem) -> list.add(streamItem),//mutates the collection
            (listOne, listTwo) -> listOne.addAll(listTwo)//merges multiple data collections into one
            //This will be covered in stream intervention
        );
  }
}
