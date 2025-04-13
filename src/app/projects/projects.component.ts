import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  isGif: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: false,
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Deep RL for Active SLAM',
      description:
        'Built an Active SLAM system for autonomous navigation using ROS2, Gazebo, SLAM Toolbox, and PIC4RL on a Clearpath Jackal robot.',
      imageUrl: 'assets/slam.gif',
      technologies: [
        'ROS2',
        'Gazebo',
        'SLAM',
        'Deep RL',
        'Occupancy grid',
        'Pose graph optimization',
      ],
      githubUrl: 'https://github.com/TeoIlie/Active_SLAM_with_DRL',
      liveUrl: 'https://youtu.be/a0PUhAlBM3Q',
      isGif: true,
    },
    {
      title: 'CNN Handwriting Classifier',
      description:
        'Designed and implemented a Convolutional Neural Network model in Python from scratch to classify handwritten digits, using the MNIST dataset.',
      imageUrl: 'assets/cnn2.gif',
      technologies: ['Python', 'Convolutional Neural Network'],
      githubUrl: 'https://github.com/TeoIlie/Intro_to_Neural_Networks',
      isGif: true,
    },
    {
      title: 'AI Pacman Game',
      description:
        'Implemented probabilistic inference algorithms to enable Pacman to hunt invisible ghosts based on noisy distance readings.',
      imageUrl: 'assets/pacman.gif',
      technologies: ['Inference', 'Python', 'AI'],
      githubUrl: 'https://github.com/TeoIlie/AI_Pacman_Agent_Game/tree/main',
      isGif: true,
    },
    {
      title: 'Monocular Visual Odometry in OpenCV',
      description:
        'Implemented SIFT feature detection and brute-force matching to accomplish Monocular Visual Odometry (MVO)',
      imageUrl: 'assets/mvo2.gif',
      technologies: ['OpenCV', 'MVO', 'Carla', 'AdverCity'],
      githubUrl: 'https://github.com/TeoIlie/Computer_Vision_MVO_Toy_Problem',
      isGif: true,
    },
    {
      title: 'Theory alignment via regular bisimulation',
      description:
        'Designed a program using tarski, a PDDL Python library, to automatically detect isomorphism, which was used to automate checking correctness of candidate solutions.',
      imageUrl: 'assets/pddl.gif',
      technologies: ['PDDL', 'Python', 'tarski'],
      paperUrl: 'https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_7781.pdf',
      liveUrl: 'http://mulab.ai/demo/p4pp',
      isGif: true,
    },
    {
      title: 'OpenGL Scene Generation',
      description:
        'Designed a 3D scene with ray tracing, reflection, refraction, and surface rendering in OpenGL using C++',
      imageUrl: 'assets/boats2.gif',
      technologies: ['Computer Graphics', 'Ray Tracing', 'OpenGL'],
      githubUrl: 'https://github.com/TeoIlie/COMP390-Computer-Graphics',
      isGif: true,
    },
  ];
}
