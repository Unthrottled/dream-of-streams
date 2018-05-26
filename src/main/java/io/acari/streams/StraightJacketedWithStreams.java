package io.acari.streams;

import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StraightJacketedWithStreams {

  public static void main(String... args) {
    Pod pod = Stream.of((
        "Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
            "Steve Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
            "Amy Javascript,HTML,CSS,Spiders,Assembly;" +
            "Chad PHP,Java,Ruby,Purple_Stuff,Anime;" +
            "Mira Python,Ruby,Whitespaces,Java,Lombok,Curly_Brace_Placement").split(";"))
        .map(podMemberInfo -> {
          String[] split = podMemberInfo.split(" ");
          return PodMember.builder()
              .name(split[0])
              .interests(new Interests(Lists.newArrayList(split[1].split(","))))
              .build();
        })
        .collect(Pod::new, Pod::addPodMumber, Pod::assimatePod);

    pod.addPodMumber(PodMember.builder()
        .name("Alex")
        .interests(new Interests(Lists.newArrayList("Imitation,Java,Cobol,Obscure_References".split(","))))
        .build());

    System.out.println(pod);

    Multimap<String, PodMember> thereCanBeMoreThanOne = pod.fetchPodMembers()
        .collect(LinkedListMultimap::create,
            (map, podMember) -> map.put(podMember.getName(), podMember),
            Multimap::putAll);

    System.out.println(thereCanBeMoreThanOne.get("Alex"));

    Map<String, Set<PodMember>> interestsToPodMember = pod.fetchPodMembers()
        .flatMap(podMember -> podMember.getInterests().fetchInterests()
            .map(interest -> new AbstractMap.SimpleEntry<>(interest, podMember)))
        .collect(Collectors.groupingBy(Map.Entry::getKey,
            Collectors.mapping(Map.Entry::getValue, Collectors.toSet())));

    System.out.println(interestsToPodMember);


  }

  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  static class Pod {
    private Set<PodMember> podMembers = new HashSet<>();

    public Pod addPodMumber(PodMember podMember) {
      podMembers.add(podMember);
      return this;
    }

    public Pod assimatePod(Pod otherPod) {//resistance is futile assimilation is eminent
      podMembers.addAll(otherPod.podMembers);
      return this;
    }

    public Stream<PodMember> fetchPodMembers() {
      return podMembers.stream();
    }
  }


  @Data
  @Builder
  static class PodMember {
    private String name;
    private Interests interests;

    public boolean isSane() {
      return interests.areSane();
    }
  }

  @Data
  @AllArgsConstructor
  static class Interests {
    private List<String> coreIntrests;

    public Stream<String> fetchInterests() {
      return coreIntrests.stream();
    }

    public boolean areSane() {
      return coreIntrests.stream()
          .map(String::toLowerCase)
          .noneMatch(interest -> interest.contains("bugs") || interest.contains("spiders"));
    }

    public boolean hasInterest(String interest) {
      final String _interest = interest.toUpperCase();
      return coreIntrests.stream().map(String::toUpperCase)
          .anyMatch(i -> i.contains(_interest));
    }
  }
}
