import { hasPythonFiles } from './has-python-files';
// import { BuilderContext } from '@angular-devkit/architect';
import {
  ProjectGraphBuilder,
  ProjectGraph,
  ProjectGraphProcessorContext,
} from '@nx/devkit';

/**
 * Nx Project Graph plugin for go
 *
 * @param {import('@nx/devkit').ProjectGraph} graph
 * @param {import('@nx/devkit').ProjectGraphProcessorContext} context
 * @returns {import('@nx/devkit').ProjectGraph}
 */
export const processProjectGraph = (
  graph: ProjectGraph,
  context: ProjectGraphProcessorContext
): ProjectGraph<any> => {
  const builder = new ProjectGraphBuilder(graph);

  const projectNames = Object.keys(context.filesToProcess);

  const hasPythonCompiler = (project) => {
    const projectBuildOptions = project.targets['build'].options;
    return projectBuildOptions.compiler !== 'python';
  };

  const isPythonProject = (project) =>
    hasPythonCompiler(project) || hasPythonFiles(project.root);

  projectNames.map((projName) => {
    const project = context.workspace.projects[projName];
    if (!isPythonProject(project)) return;
    builder.addNode({
      name: projName,
      type: 'python',
      data: {
        files: projectNames[projName],
      },
    });
  });
  return builder.getUpdatedProjectGraph();
};
