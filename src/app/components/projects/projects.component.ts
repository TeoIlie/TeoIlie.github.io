import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Deep RL for Active SLAM',
      description:
        'Built an Active SLAM system for autonomous navigation using ROS2, Gazebo, SLAM Toolbox, and PIC4RL on a Clearpath Jackal robot.',
      image: 'assets/demo.gif',
      technologies: [
        'ROS2',
        'Gazebo',
        'SLAM',
        'Deep RL',
        'Occupancy grid',
        'Pose graph optimization',
      ],
      link: 'https://github.com/TeoIlie/Active_SLAM_with_DRL',
    },
    {
      title: 'CNN Handwriting Classifier',
      description:
        'Designed and implemented a Convolutional Neural Network model in Python from scratch to classify handwritten digits, using the MNIST dataset.',
      image: 'assets/cnn.gif',
      technologies: ['Python', 'Convolutional Neural Network'],
      link: 'https://github.com/TeoIlie/Intro_to_Neural_Networks',
    },
    {
      title: 'Theory alignment via regular bisimulation',
      description:
        'Designed a program using tarski, a PDDL Python library, to automatically detect isomorphism, which was used to automate checking correctness of candidate solutions.',
      image: 'assets/pddl.gif',
      technologies: ['PDDL', 'Python', 'tarski'],
      link: 'https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_7781.pdf',
    },
    {
      title: 'AI Pacman Game',
      description:
        'Implemented probabilistic inference algorithms to enable Pacman to hunt invisible ghosts based on noisy distance readings.',
      image: 'assets/pacman.gif',
      technologies: ['Inference', 'Python', 'AI'],
      link: 'https://github.com/TeoIlie/AI_Pacman_Agent_Game/tree/main',
    },
    {
      title: 'Monocular Visual Odometry in OpenCV',
      description:
        'Implemented SIFT feature detection and brute-force matching to accomplish Monocular Visual Odometry (MVO)',
      image: 'assets/mvo.gif',
      technologies: ['OpenCV', 'MVO', 'Carla', 'AdverCity'],
      link: 'https://github.com/TeoIlie/Computer_Vision_MVO_Toy_Problem',
    },
    {
      title: 'Monocular Visual Odometry in OpenCV',
      description:
        'Designed a 3D scene with ray tracing, reflection, refraction, and surface rendering in OpenGL using C++',
      image: 'assets/boats.gif',
      technologies: ['Computer Graphics', 'Ray Tracing', 'OpenGL'],
      link: 'https://github.com/TeoIlie/COMP390-Computer-Graphics',
    },
  ];
}
