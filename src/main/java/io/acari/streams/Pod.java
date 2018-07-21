package io.acari.streams;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pod {
    private Set<PodMember> podMembers = new HashSet<>();

    public Pod addPodMember(PodMember podMember){
        podMembers.add(podMember);
        return this;
    }

    public Pod combinePod(Pod otherPod){
        podMembers.addAll(otherPod.getPodMembers());
        return this;
    }

    public Stream<PodMember> fetchPodMembers(){
        return podMembers.stream();
    }
}


